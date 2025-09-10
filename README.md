# xk6-tcp

A k6 extension for sending strings to TCP port

## Build

To build a `k6` binary with this plugin, first ensure you have the prerequisites:

- [Go toolchain](https://go101.org/article/go-toolchain.html)
- Git

Then:

1. Install `xk6`:

  ```shell
  go install github.com/k6io/xk6/cmd/xk6@latest
  ```

2. Build the binary:

  ```shell
  xk6 build master --with github.com/koshelev65/xk6-tcp
  ```

## Example, test.js

```javascript
import tcp from 'k6/x/tcp';
import { check } from 'k6';

const conn = tcp.connect("linkedin.com:80");

export default function() {
  tcp.write(conn, "GET / HTTP/1.0\nHost: linkedin.com\n\n")
  const reply = String.fromCharCode(...tcp.read(conn, 1024));
  check(reply, {"check redirect": res => res.includes("301")});
  console.log(reply.split("\r\n").join(("\n")));
}
```

## Execution output
```
user@host:~>k6 run test.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: test.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

INFO[0000] HTTP/1.1 301 Moved Permanently
Location: https://www.linkedin.com/
X-Li-Fabric: prod-lor1
X-Li-Pop: afd-prod-lor1-x
X-Li-Proto: http/1.0
X-LI-UUID: AAY+eIJj+l7sf1m4A/xUYg==
X-Cache: CONFIG_NOCACHE
Alt-Svc: h3=":443"; ma=86400
X-MSEdge-Ref: Ref A: 5E415AEF0DF64FD089E28F42993D1D52 Ref B: BY1AA1072318060 Ref C: 2025-09-10T20:46:04Z
Date: Wed, 10 Sep 2025 20:46:04 GMT
Connection: close
Content-Length: 0
  source=console


  █ TOTAL RESULTS

    checks_total.......: 1       19.828287/s
    checks_succeeded...: 100.00% 1 out of 1
    checks_failed......: 0.00%   0 out of 1

    ✓ check redirect

    EXECUTION
    iteration_duration...: avg=47.56ms min=47.56ms med=47.56ms max=47.56ms p(90)=47.56ms p(95)=47.56ms
    iterations...........: 1   19.828287/s

    NETWORK
    data_received........: 0 B 0 B/s
    data_sent............: 0 B 0 B/s




running (00m00.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.0s/10m0s  1/1 iters, 1 per VU
```