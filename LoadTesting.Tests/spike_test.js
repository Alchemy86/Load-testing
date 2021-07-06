/*
    Spike testing - Variation of the stress test. Instead of a gradual load, it will spike to an extreme in a very short window.

    Run a stress test to: 
        - Determine how your system will perform under a sudden surge of traffic
        - Determine if your system will recover once the traffic has subsided
    
    Success is based on expectations.
        - Excellent: System performance is not degraded during the surge of traffic with response time remaining constant
        - Good: Response time is slower but the system does not produce any errors
        - Poor: System produces errors during the surge of traffic, but recovers to normal after the traffic subsides.
        - Bad: System Crashes and does not recover after the traffic has subsided
*/

import http from 'k6/http';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10s', target: 100 }, // Below normal Load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // Spike to 1400 Users
        { duration: '3m', target: 1400 }, // Stay at 1400 for 3 minutes
        { duration: '10s', target: 100 }, // Scale down, Recovery Stage.
        { duration: '3m', target: 100 },
        { duration: '10s', target: 0 }
    ]
};

const API_BASE_URL = 'https://localhost:5001';

export default () => {
    http.batch([
        ['GET', `${API_BASE_URL}/testing`]
    ])
};
