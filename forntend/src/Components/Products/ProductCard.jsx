import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/Components/ui/button';

function ProductCard({ product, onClick }) {
  if (!product) return null;

  const { name, price, description, imageUrl } = product;
  console.log(product);

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Card className="w-full max-w-xs mx-auto overflow-hidden bg-gray-100 ">
        <CardHeader className="p-0">
          <img src={imageUrl} alt={name || 'Product'} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-xl">{name || 'Unnamed Product'}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description || 'No description available'}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <span className="text-2xl font-bold text-primary">
            Rs.{price ? price.toFixed(2) : '0.00'}
          </span>
          <Button variant="outline" size="icon" className="cursor-pointer">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductCard;
