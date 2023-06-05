export function authHeader() {
    const LIVE_UPDATE_SERVICE_KEY = "LIv3Upd4t3S3rVic3s3200";
        return { 'Service-Secret': LIVE_UPDATE_SERVICE_KEY};
}