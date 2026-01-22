import React, { useEffect, useState } from "react"
import { Leaf,X,Camera,Loader2 } from "lucide-react"
function ProductForm({ initialData, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
        harvest_date: "",
        product_image: null,
        is_active:'true'
    })

    // Prefill when editing
    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                price: initialData.price || "",
                quantity: initialData.quantity || "",
                harvest_date: initialData.harvest_date || ""
            })
        }
    }, [initialData])
    const [isSubmitting,setIsSubmitting]=useState(false)


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

   const handleSubmit = async(e) => {
    e.preventDefault()
setIsSubmitting(true)
    const formData = new FormData()

    formData.append("name", form.name)
    formData.append("price", form.price)
    formData.append("quantity", form.quantity)
    formData.append("harvest_date", form.harvest_date)
    formData.append("is_active","True")

    if (form.product_image) {
        formData.append("photo", form.product_image)
    }
try{
  
    await onSubmit(formData)   
}
finally{
    setIsSubmitting(false)
}  
}

    return (
       <div className="fixed inset-0 z-100 flex justify-center items-center px-4">
            {/* Backdrop Blur */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />
            
            <form
                onSubmit={handleSubmit}
                className="relative bg-white/95 backdrop-blur-xl p-8 rounded-[2.5rem] w-full max-w-md space-y-5 border border-white shadow-2xl animate-in fade-in zoom-in duration-300"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-xl text-green-600">
                            <Leaf size={20} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                            {initialData ? "Edit Listing" : "New Listing"}
                        </h2>
                    </div>
                    <button type="button" onClick={onCancel} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Product Details</label>
                        <input
                            name="name"
                            placeholder="e.g. Fresh Organic Tomatoes"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-green-500 focus:bg-white outline-none transition-all font-semibold text-slate-700"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Price (₹)</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="0.00"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Stock (kg)</label>
                            <input
                                name="quantity"
                                type="number"
                                placeholder="0"
                                value={form.quantity}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Harvest Date</label>
                        <input
                            name="harvest_date"
                            type="date"
                            value={form.harvest_date}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-green-500 outline-none transition-all font-semibold"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-4xl cursor-pointer bg-slate-50 hover:bg-white hover:border-green-400 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Camera className="w-8 h-8 mb-2 text-slate-400 group-hover:text-green-500" />
                                <p className="text-sm font-bold text-slate-500">{form.product_image ? form.product_image.name : "Upload Product Photo"}</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setForm({ ...form, product_image: e.target.files[0] })}
                            />
                        </label>
                    </div>
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-black hover:bg-slate-200 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                           disabled={isSubmitting}
                        className="flex-1 items-center py-4 rounded-2xl bg-green-500 text-white font-black shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95"
                    >{isSubmitting ? (
                            <> <div className="flex items-center gap-2 ">
                                <Loader2 className="animate-spin ml-2 " size={30} />
                                <span>Processing...</span>
                                </div>
                            </>
                        ) : (
                            <span>{initialData ? "Save Changes" : "Post Product"}</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
