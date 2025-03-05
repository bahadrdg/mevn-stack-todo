import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import cryptoIcons from "@/assets/cyripto-icons/bitcoin.svg";

export default function DigitalWallets() {
  return (
    <Card className="lg:col-span-6 xl:col-span-2">
      <CardHeader className="flex-row justify-between">
        <CardTitle>Digital Wallets</CardTitle>
        <Link to="#" className="!mt-0 text-sm hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <a href="#" className="block">
          <Card className="hover:border-primary/30">
            <CardContent className="px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <img
                  className="h-6 w-6 object-contain"
                  src={cryptoIcons}
                />
                <span>Bitcoin Wallet</span>
              </div>
              <div>4.434953 BTC</div>
            </CardContent>
          </Card>
        </a>
        <a href="#" className="block">
          <Card className="hover:border-primary/30">
            <CardContent className="px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <img
                  className="h-6 w-6 object-contain"
                  src={cryptoIcons}
                />
                <span>Ethereum Wallet</span>
              </div>
              <div>4.434953 ETH</div>
            </CardContent>
          </Card>
        </a>
        <a href="#" className="block">
          <Card className="hover:border-primary/30">
            <CardContent className="px-4 py-3">
              <div className="mb-2 flex items-center gap-2">
                <img
                  className="h-6 w-6 object-contain"
                  src={cryptoIcons}
                />
                <span>Avalanche Wallet</span>
              </div>
              <div>3.434953 ETH</div>
            </CardContent>
          </Card>
        </a>
      </CardContent>
    </Card>
  );
}
