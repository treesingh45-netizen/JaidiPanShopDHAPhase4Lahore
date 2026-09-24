import React, { useState } from 'react';
import { X, Search, Check, Edit3, Settings, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MenuItem } from '../types';

export const AdminMenuModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    menuItems,
    updateMenuItem,
  } = useStore();

  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  if (!isAdminModalOpen) return null;

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(editingItem);
      setEditingItem(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D90000] flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Jaidi Store Owner & Menu Manager
              </h3>
              <p className="text-xs text-neutral-400">
                146 Live Menu Items · Instant Price & Availability Updates
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
          {editingItem ? (
            /* Editing form */
            <form onSubmit={handleSaveItem} className="space-y-4 bg-[#F7F7F7] p-5 rounded-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <h4 className="font-bold text-neutral-900 text-sm">
                  Editing: {editingItem.name}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="text-xs text-neutral-500 hover:text-neutral-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: Number(e.target.value) })
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingItem.image}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, image: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-200 rounded-lg p-2 font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.isAvailable}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isAvailable: e.target.checked })
                      }
                      className="accent-[#D90000] w-4 h-4 rounded"
                    />
                    <span className="font-semibold text-neutral-800">In Stock / Available</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingItem.isFeatured}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isFeatured: e.target.checked })
                      }
                      className="accent-[#D90000] w-4 h-4 rounded"
                    />
                    <span className="font-semibold text-neutral-800">Featured Item</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D90000] hover:bg-[#A80000] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* Items Table List */
            <>
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter 146 menu items by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl pl-9 pr-3 py-2 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
                />
              </div>

              <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
                <div className="bg-neutral-50 px-4 py-2 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Product ({filteredItems.length})</span>
                  <span>Price / Stock / Action</span>
                </div>

                <div className="max-h-[50vh] overflow-y-auto divide-y divide-neutral-100">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-2.5 flex items-center justify-between hover:bg-neutral-50 text-xs transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-bold text-neutral-900 block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 capitalize">
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono font-bold text-neutral-900">
                          Rs. {item.price}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            item.isAvailable
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {item.isAvailable ? 'In Stock' : 'Out'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingItem(item)}
                          className="p-1 rounded text-neutral-500 hover:text-[#D90000] hover:bg-neutral-100 cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
