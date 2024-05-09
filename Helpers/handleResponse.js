export function handleResponse(response) {
    return response.text().then((text) => {
        if (!response.ok) {
            var error = '';
            switch (response.status) {
                case 400:
                    {
                        error = response.statusText + ' ' + text;
                        console.error('SYSTEM ERROR', {
                            errorCode: response.status,
                            message: error
                        });
                    }
                    break;
                case 401:
                    {
                        error = response.statusText + ' ' + text;
                        console.error('SYSTEM ERROR', {
                            errorCode: response.status,
                            message: error
                        });
                    }
                    break;
                case 500:
                    {
                        error = response.statusText + ' ' + text;
                        console.error('SYSTEM ERROR', {
                            errorCode: response.status,
                            message: error
                        });
                    }
                    break;
                default:
                    {
                        error = response.statusText + ' ' + text;
                        console.error('SYSTEM ERROR', {
                            errorCode: response.status,
                            message: error
                        });
                    }
                    break;
            }

            return Promise.reject(error);
        } else {
            let parsed = {};
            try {
                parsed = JSON.parse(text);
            } catch (e) {
                parsed = JSON.parse(JSON.stringify(text));
            }
            return parsed;
        }
    });
}