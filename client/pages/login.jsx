import Link from 'next/link';

const Login = () => {
  return (
    <div>
      <h2>This is the login page</h2>
      <Link href="/">
        <button>Go back home</button>
      </Link>
    </div>
  )
}

export default Login;