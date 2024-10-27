import { useRouter } from 'next/router';

const InfoPage = () => {
  const router = useRouter();
  const { slug = [] } = router.query;

  if (slug.length === 0) {
    return (
      <div>
        <h1>Information Home</h1>
        <p>Welcome to the Information page! Choose a section:</p>
        <ul>
          <li><a href="/info/faqs">FAQs</a></li>
          <li><a href="/info/support">Support</a></li>
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
