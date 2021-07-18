const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ useAccelerateEndpoint: true });
const ulid = require("ulid");

const { BUCKET_NAME } = process.env;

module.exports.handler = async (event) => {
  const id = ulid.ulid(); // ulid so we can sort it, unlike uuid
  let key = `${event.identity.username}/${id}`;

  const extension = event.arguments.extension;
  if (extension) {
    if (extension.startsWith(".")) {
      key += extension;
    } else {
      key += `.${extension}`;
    }
  }

  const contentType = event.arguments.contentType || "image/jpeg";
  if (!contentType.startsWith("image/")) {
    throw new Error("content type should be an image");
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ACL: "public-read",
    ContentType: contentType,
  };
  // generated locally, doesn't make a request to S3, so no need for await/promise
  const signedUrl = s3.getSignedUrl("putObject", params); // doesn't limit size of image, so user can upload 10GB+. Instead, consider getPresignedPostUrl

  return signedUrl;
};
