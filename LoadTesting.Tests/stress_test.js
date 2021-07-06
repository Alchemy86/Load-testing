/*
    Stress testing - type of load testing used to determine the limits of the system.
    The purpose of this test is to verify the stability and reliability of the system under extreme conditions.

    Run a stress test to:
        - Determine how your system will behave under extreme conditions
        - Determine what is the maximum capacity of your system in terms of users or throughput
        - Determine the breaking point of your system and its failure mode
        - Determine if your system will recover wihtout manual intervention after the stress test is over
*/

import http from 'k6/http';
import { sleep } from 'k6'; 

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 100 }, // Below normal Load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // Normal Load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // Approx breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 500 }, // Beyond breaking point
        { duration: '5m', target: 500 },
        { duration: '10m', target: 0 } // Scale down. Recovery
    ]
};

const API_BASE_URL = 'https://localhost:5001';

export default () => {
    http.batch([
        ['GET', `${API_BASE_URL}/testing`]
    ])
};
