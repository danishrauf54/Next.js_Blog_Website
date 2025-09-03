import { SeoHead } from '@/utils/helpers';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Contact() {
  return (
    <>
      <SeoHead title="Contact" description="Get in touch." />
      <Card>
        <h1 className="text-2xl font-bold mb-3">Contact</h1>
        <form className="grid gap-3 max-w-lg">
          <input className="border rounded-xl p-3" placeholder="Your name" />
          <input type="email" className="border rounded-xl p-3" placeholder="Email" />
          <textarea className="border rounded-xl p-3" placeholder="Message" rows="4" />
          <Button type="button">Send</Button>
        </form>
      </Card>
    </>
  );
}
