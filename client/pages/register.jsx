import Link from 'next/link';

const Register = () => {
  return (
    <div>
      <h2>This is the register page</h2>
      <Link href="/">
        <button>Go back home</button>
      </Link>
    </div>
  )
}

export default Register;