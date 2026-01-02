import React, { useEffect, useState } from "react"

function ProductForm({ initialData, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: "",
        harvest_date: ""
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl w-96 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    {initialData ? "Edit Product" : "Add Product"}
                </h2>

                <input
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity (kg)"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    name="harvest_date"
                    type="date"
                    value={form.harvest_date}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {initialData ? "Update" : "Create"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
