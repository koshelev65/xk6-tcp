import tcp from 'k6/x/tcp';
import { check } from 'k6';

const conn = tcp.connect("linkedin.com:80");

export default function() {
  tcp.write(conn, "GET / HTTP/1.0\nHost: linkedin.com\n\n")
  const reply = String.fromCharCode(...tcp.read(conn, 1024));
  check(reply, {"check redirect": res => res.includes("301")});
  console.log(reply.split("\r\n").join(("\n")));
}
