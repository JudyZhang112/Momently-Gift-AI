export default function middleware() {
  return Response.next();
}

export const config = {
  matcher: []
};
