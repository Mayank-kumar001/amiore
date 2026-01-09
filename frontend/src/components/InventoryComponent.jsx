

import { useEffect, useState } from "react"
import { Plus, Trash2, Info, Package, ChevronRight } from "lucide-react"
import { productStore } from "../store/productStore"

export default function InventoryComponent() {
    const {updateStocks} = productStore()
    const [variants, setVariants] = useState([
        { id: 1, size: "S", count: 15 },
        { id: 2, size: "M", count: 24 },
        { id: 3, size: "L", count: 12 },
    ])
    useEffect(() => {
  updateStocks(
    variants.map((v) => ({
      size: v.size,
      quantity: v.count,
    }))
  )
}, [variants, updateStocks])


    const addVariant = () => {
        const newId = variants.length > 0 ? Math.max(...variants.map((v) => v.id)) + 1 : 1
        setVariants([...variants, { id: newId, size: "", count: 0 }])
        
    }

    const removeVariant = (id) => {
        setVariants(variants.filter((v) => v.id !== id))
        
    }

    const updateVariant = (id, field, value) => {
        setVariants(variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
       

    }

    const totalStock = variants.reduce((sum, v) => sum + (v.count || 0), 0)
    

    return (
        <div className="max-w-2xl mt-4">
            <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b ">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl">
                                <Package className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Stock & Sizing</h2>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-sm text-muted-foreground">Manage product availability</span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary tracking-wider">
                                        Admin
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-primary">{totalStock}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Units</div>
                        </div>
                    </div>
                </div>

                {/* Inventory List */}
                <div className="p-6">
                    <div className="space-y-3">
                        {variants.length === 0 ? (
                            <div className="text-center py-16 bg-blue-200/20 border-2 border-dashed rounded-2xl">
                                <Package className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                <p className="text-sm font-medium text-muted-foreground">No stock variants defined</p>
                                <button onClick={addVariant} className="mt-4 text-xs font-bold text-primary hover:underline">
                                    Create your first variant
                                </button>
                            </div>
                        ) : (
                            variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className="flex items-center gap-4 p-4 cursor-pointer bg-blue-200/30 hover:bg-blue-300/50 border border-transparent hover:border-border rounded-xl transition-all group"
                                >
                                    <div className="flex-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block px-1">
                                            Size
                                        </label>
                                        <input
                                            type="text"
                                            value={variant.size}
                                            placeholder="e.g. M or 32"
                                            onChange={(e) => updateVariant(variant.id, "size", e.target.value)}
                                            className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold placeholder:text-muted-foreground/50 p-1"
                                        />
                                    </div>

                                    <div className="h-8 w-px bg-border/50" />

                                    <div className="flex-[1.5]">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block px-1 text-center">
                                            Quantity
                                        </label>
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => updateVariant(variant.id, "count", Math.max(0, variant.count - 1))}
                                                className="w-6 h-6 flex items-center justify-center rounded-lg bg-card border shadow-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={variant.count}
                                                onChange={(e) => updateVariant(variant.id, "count", Number.parseInt(e.target.value) || 0)}
                                                className="w-12 bg-transparent border-none focus:ring-0 text-sm font-black text-center p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <button
                                                onClick={() => updateVariant(variant.id, "count", variant.count + 1)}
                                                className="w-6 h-6 flex items-center justify-center rounded-lg bg-card border shadow-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeVariant(variant.id)}
                                        className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        onClick={addVariant}
                        className="w-full mt-6 py-3 border-2 border-dashed border-primary/20 hover:border-primary/50 rounded-2xl text-primary font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-primary/5"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Size Variant
                    </button>
                </div>


            </div>
        </div>
    )
}
