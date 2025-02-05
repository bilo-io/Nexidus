import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    // http.get('http://localhost:8000/api/projects');
    http.get('https://vision-api-dev.vercel.app/api/projects');
    // sleep(0.5);
}