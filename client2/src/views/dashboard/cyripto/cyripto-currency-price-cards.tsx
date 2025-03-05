import { Card, CardContent } from "@/components/ui/card";
import { InfiniteSlider } from "@/components/ui/custom/infinite-slider";
import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const prices = [
  {
    id: 1,
    icon: "bitcoin",
    name: "Bitcoin",
    price: "$65,123",
    changed: "4% (30 days)"
  },
  {
    id: 2,
    icon: "ethereum",
    name: "Ethereum",
    price: "$35,123",
    changed: "48% (30 days)"
  },
  {
    id: 3,
    icon: "avalanche",
    name: "Avalanche",
    price: "$5,123",
    changed: "28% (30 days)"
  },
  {
    id: 4,
    icon: "bnb-bnb",
    name: "Bnb (Bnb)",
    price: "$2,123",
    changed: "34% (30 days)"
  },
  {
    id: 5,
    icon: "dogecoin",
    name: "Dogecoin",
    price: "$2,823",
    changed: "30% (30 days)"
  }
];
import cryptoIcons from "@/assets/cyripto-icons/bitcoin.svg";

export default function CyriptoCurrencyPriceCards() {
  return (
    <InfiniteSlider durationOnHover={75}>
      {prices.map((item) => (
        <Link key={item.id} to="#">
          <Card className="text-sm hover:border-primary/30">
            <CardContent className="flex items-center gap-4 p-3">
              <div>
                <div className="mb-1 flex items-center">
                  <ChevronUp className="h-5 w-5 text-green-700" /> {item.changed}
                </div>
                <div className="!text-base font-bold">{item.price}</div>
              </div>
              <img
                className="h-12 w-12 rounded-full bg-muted p-2"
                src={cryptoIcons}
                alt={item.name}
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </InfiniteSlider>
  );
}
