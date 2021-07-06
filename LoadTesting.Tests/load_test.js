/*
    Load testing - Primarily concerned with assessing the current performance of your system in terms of concurrent users or requests per second.
    When you want to understand if your syustem is meeting the performance goals, this is the type of test you'll run.

    Run a Load Test to:
        - Assess the current performance of your system under typical and peak load
        - Make sure you are continuously meeting the perforamnce standards as you make changes to your system.
*/

import http from 'k6/http';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 100 }, // Simulate ramp-up of traffic from 1 to 100 users over 5 mins
        { duration: '10m', target: 100 }, // Stay at 100 users for 10 minutes
        { duration: '5m', target: 0 } // Ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must compelte below 150ms
    }
};

const API_BASE_URL = 'https://localhost:5001';

export default () => {
    let response = http.get(`${API_BASE_URL}/testing`);
    sleep(1);
};
