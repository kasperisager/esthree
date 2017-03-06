class Bucket {
  /**
   * Construct a new bucket.
   *
   * @param {S3} client
   * @param {String} bucket
   */
  constructor(client, bucket) {
    this.client = client;
    this.bucket = bucket;
  }

  /**
   * Get the location of this bucket.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getBucketLocation-property
   *
   * @param {Object} opts
   * @return {Promise}
   */
  location(opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.getBucketLocation({
        ...opts,
        Bucket: this.bucket
      }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  /**
   * Get an existing object.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
   *
   * @param {String} key
   * @param {Object} opts
   * @return {Promise}
   */
  get(key, opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.getObject({
        ...opts,
        Bucket: this.bucket,
        Key: key
      }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  /**
   * Check if an object exists.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headObject-property
   *
   * @param {String} key
   * @param {Object} opts
   * @return {Promise}
   */
  has(key, opts = {}) {
    return new Promise(resolve =>
      this.client.headObject({
        ...opts,
        Bucket: this.bucket,
        Key: key
      }, (err, data) =>
        resolve(!err && data !== null)
      )
    );
  }

  /**
   * Return meta information about an object.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headObject-property
   *
   * @param {String} key
   * @param {Object} opts
   * @return {Promise}
   */
  head(key, opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.headObject({
        ...opts,
        Bucket: this.bucket,
        Key: key
      }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  /**
   * Create a new or overwrite an existing object.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
   *
   * @param {String} key
   * @param {*} body
   * @param {Object} opts
   * @return {Promise}
   */
  put(key, body, opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.putObject({
        ...opts,
        Bucket: this.bucket,
        Key: key,
        Body: body
      }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  /**
   * Remove an existing object.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
   *
   * @param {String} key
   * @param {Object} opts
   * @return {Promise}
   */
  remove(key, opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.deleteObject({
        ...opts,
        Bucket: this.bucket,
        Key: key
      }, err =>
        err ? reject(err) : resolve()
      )
    );
  }

  /**
   * Copy an object to a different location.
   *
   * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
   *
   * @param {String} source
   * @param {String} target
   * @param {Object} opts
   * @return {Promise}
   */
  copy(source, target, opts = {}) {
    return new Promise((resolve, reject) =>
      this.client.copyObject({
        ...opts,
        Bucket: this.bucket,
        Key: target,
        CopySource: `${this.bucket}/${source}`
      }, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }
}

/**
 * Create a new bucket.
 *
 * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
 *
 * @param {S3} client
 * @param {String} bucket
 * @param {Object} [opts={}]
 * @return {Promise}
 */
export function create(client, bucket, opts = {}) {
  return new Promise((resolve, reject) =>
    client.createBucket({...opts, Bucket: bucket}, err =>
      err ? reject(err) : resolve(new Bucket(client, bucket))
    )
  );
}

/**
 * Get an existing bucket.
 *
 * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headBucket-property
 *
 * @param {S3} client
 * @param {String} bucket
 * @param {Object} [opts={}]
 * @return {Promise}
 */
export function get(client, bucket, opts = {}) {
  return new Promise((resolve, reject) =>
    client.headBucket({...opts, Bucket: bucket}, err =>
      err ? reject(err) : resolve(new Bucket(client, bucket))
    )
  );
}

/**
 * Check if a bucket exists.
 *
 * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#headBucket-property
 *
 * @param {S3} client
 * @param {String} bucket
 * @param {Object} [opts={}]
 * @return {Promise}
 */
export function has(client, bucket, opts = {}) {
  return new Promise(resolve =>
    client.headBucket({...opts, Bucket: bucket}, (err, data) =>
      resolve(!err && data !== null)
    )
  );
}

/**
 * Remove an existing bucket.
 *
 * @see http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteBucket-property
 *
 * @param {S3} client
 * @param {String} bucket
 * @param {Object} [opts={}]
 * @return {Promise}
 */
export function remove(client, bucket, opts = {}) {
  return new Promise((resolve, reject) =>
    client.deleteBucket({...opts, Bucket: bucket}, err =>
      err ? reject(err) : resolve()
    )
  );
}
