import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { createOrderApi } from "../../APIs/GoogleApi"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

function DialogBox({ product, onClose }) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const totalPrice = product.price * quantity

  const handleBuyNow = async () => {
    try {
     
      const user = JSON.parse(localStorage.getItem('user'))

      if (!user?._id) {
        iziToast.error({
          title: "Error",
          message: "Please login to place order",
          position: "topRight",
        })
        return
      }

    
    const orderData = {
    user: user._id,
    products: [
        {
            product: product._id,
            quantity: quantity
        }
    ],
    totalAmount: totalPrice
}
      
      const response = await createOrderApi(orderData)

      if (response && response.status === 201) {
        console.log("Order created successfully", response.data)
        iziToast.success({
          title: "Success",
          message: "Order placed successfully",
          position: "topRight",
        })
        onClose() // Close dialog after order
      } else {
        console.error("Failed to create order", response)
        iziToast.error({
          title: "Error",
          message: response?.data?.message || "Failed to create order",
          position: "topRight",
        })
      }
    } catch (error) {
      console.error("Error creating order", error)
      iziToast.error({
        title: "Error",
        message: error.message || "Something went wrong while placing order",
        position: "topRight",
      })
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{product.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={product.imageUrl || "/placeholder-image.png"}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Unit Price:</span>
              <span className="font-semibold">Rs {product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1} className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-base font-bold">Total:</span>
              <span className="text-xl font-bold text-primary">Rs {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            onClick={handleBuyNow}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Buy Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBox