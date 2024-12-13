// pages/info/[[...slug]].js
import { useRouter } from 'next/router';
import Link from 'next/link';

const InfoPage = () => {
  const router = useRouter();
  const { slug = [] } = router.query;

  if (slug.length === 0) {
    return (
      <div>
        <h1>Information Home</h1>
        <p>Welcome to the Information page!</p>
        <ul>
          <li><Link href="/info/faqs">FAQs</Link></li>
          <li><Link href="/info/support">Support</Link></li>
        </ul>
      </div>
    );
  }

  if (slug[0] === 'faqs') {
    return (
      <div>
        <h1>Frequently Asked Questions</h1>
        <p>Here you'll find answers to common questions.</p>
      </div>
    );
  }

  if (slug[0] === 'support') {
    return (
      <div>
        <h1>Support</h1>
        <p>Contact support for assistance with any issues.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default InfoPage;