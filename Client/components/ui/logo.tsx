import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={'/images/logo.png'} width={120} height={120} alt='logo'/>
    </Link>
  )
}
