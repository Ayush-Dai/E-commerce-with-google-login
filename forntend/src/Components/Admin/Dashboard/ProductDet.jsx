import { useEffect, useState } from "react"
import { allproductsApi, addProductApi, editProductApi,deleteProductApi } from "../../../APIs/GoogleApi"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Loader2, Trash2 } from "lucide-react"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await allproductsApi()
      if (response.status === 200) {
        const sorted = response.data.products.sort((a, b) => a.name.localeCompare(b.name))
        setProducts(sorted)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: null,
    })
    setCurrentProduct(null)
  }

  const handleAddFormSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("image", formData.image)

      const res = await addProductApi(data)
      if (res.status === 201) {
        fetchProducts()
        setShowAddForm(false)
        resetForm()
        iziToast.success({
          title: "Success",
          message: "Product added successfully",
          position: "topRight",
        })
      }
    } catch (error) {
      console.error("Error adding product:", error)
      iziToast.error({
        title: "Error",
        message: "Failed to add product",
        position: "topRight",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    if (!currentProduct) return
    setSubmitting(true)
    console.log(currentProduct);
    console.log(formData);

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("description", formData.description)
      data.append("price", formData.price)
      if (formData.image instanceof File) {
        data.append("image", formData.image)
      }

      const res = await editProductApi(currentProduct._id,formData)
      if (res.status === 200) {
        fetchProducts()
        setShowEditForm(false)
        resetForm()
        iziToast.success({
          title: "Success",
          message: "Product updated successfully",
          position: "topRight",
        })
      }
    } catch (error) {
      console.error("Error updating product:", error)
      iziToast.error({
        title: "Error",
        message: "Failed to update product",
        position: "topRight",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async () => {
    if (!currentProduct) return
    setSubmitting(true)
    try {
      const res = await deleteProductApi(currentProduct._id);
      if (res.status === 200) {
        fetchProducts()
        setShowDeleteAlert(false)
        setShowEditForm(false)
        resetForm()
        iziToast.success({
          title: "Deleted",
          message: "Product deleted successfully",
          position: "topRight",
        })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      iziToast.error({
        title: "Error",
        message: "Failed to delete product",
        position: "topRight",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditForm = (product) => {
    setCurrentProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null,
    })
    setShowEditForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Product Management</CardTitle>
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddFormSubmit} className="space-y-4 pt-4">
                <Input label="Product Name" name="name" value={formData.name} onChange={handleFormChange} required placeholder="Enter product name" />
                <Textarea label="Description" name="description" value={formData.description} onChange={handleFormChange} required placeholder="Enter description" />
                <Input label="Price (Rs.)" name="price" type="number" value={formData.price} onChange={handleFormChange} required placeholder="Enter price" />
                <Input label="Product Image" name="image" type="file" accept="image/*" onChange={handleFormChange} required />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button type="submit" disabled={submitting} className="gap-1">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Submitting..." : "Add Product"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No products found.</TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>Rs. {product.price}</TableCell>
                  <TableCell className="hidden md:table-cell truncate">{product.description}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openEditForm(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Product Dialog */}
      <Dialog open={showEditForm} onOpenChange={(open) => { setShowEditForm(open); if (!open) resetForm() }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditFormSubmit} className="space-y-4 pt-4">
            <Input label="Product Name" name="name" value={formData.name} onChange={handleFormChange} required />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleFormChange} required />
            <Input label="Price (Rs.)" name="price" type="number" value={formData.price} onChange={handleFormChange} required />
            <Input name="image" type="file" accept="image/*" onChange={handleFormChange} />
            <p className="text-sm text-muted-foreground">{currentProduct?.image ? "Leave empty to keep current image" : "No image currently set"}</p>
            <div className="flex justify-between pt-2">
              <Button type="button" variant="destructive" onClick={() => setShowDeleteAlert(true)}>Delete</Button>
              <div className="flex gap-2">
                <Button variant="outline" type="button" onClick={() => setShowEditForm(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting} className="gap-1">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete "{currentProduct?.name}".</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct} disabled={submitting}>
              {submitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
