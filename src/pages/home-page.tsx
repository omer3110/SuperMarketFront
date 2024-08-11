import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

function HomePage() {
  return (
    <main className="bg-white text-gray-800 py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Welcome to SmartCart
        </h1>
        <p className="text-lg leading-relaxed mb-8 max-w-2xl">
          SmartCart is your ultimate supermarket shopping companion, designed to
          help you compare prices, find the best deals, and save money on your
          grocery shopping. Whether you’re planning a weekly grocery run or just
          looking for the best price on a single item, SmartCart makes it easy
          to get the most out of your shopping experience.
        </p>
        <img
          className="w-full max-w-md mb-8 rounded-lg shadow-lg"
          src="https://via.placeholder.com/400x300" // Replace with your image URL
          alt="Shopping Illustration"
        />
        <Button asChild>
          <Link
            to="/auth/register"
            className="text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-lg font-medium"
          >
            Join Now <ArrowRight className="ml-2 inline-block" />
          </Link>
        </Button>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is SmartCart?</AccordionTrigger>
            <AccordionContent>
              SmartCart is a web application that allows you to compare prices
              across various supermarkets, helping you find the best deals and
              save money on your grocery shopping.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I use SmartCart?</AccordionTrigger>
            <AccordionContent>
              Simply add items to your cart, and SmartCart will show you the
              best prices available at nearby supermarkets. You can also save
              your favorite carts and use them for future shopping trips.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is SmartCart free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, SmartCart is completely free to use. We aim to help you save
              money without any additional cost.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Can I access SmartCart on my mobile device?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! SmartCart is designed to be fully responsive, so you
              can access it on your smartphone, tablet, or computer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}

export default HomePage;
