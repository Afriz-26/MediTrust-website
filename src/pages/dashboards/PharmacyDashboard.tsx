import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthcare } from '../../context/HealthcareContext';
import { Pill, ShoppingBag, Truck, Plus, Trash2, CheckCircle, Clock, MapPin, Sparkles, DollarSign, Edit, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const PharmacyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    pharmacyOrders, updatePharmacyOrderStatus, 
    inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem,
    allPharmacies, updatePharmacyProfile, purchaseSubscription, purchaseAdBooster
  } = useHealthcare();

  const myPharmRecord = allPharmacies.find(p => p.email === user?.email || p.name === user?.name) || allPharmacies[0];

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'profile' | 'monetization'>('orders');

  // Inventory Add Modal / State
  const [showAddModal, setShowAddModal] = useState(false);
  const [medName, setMedName] = useState('');
  const [medCategory, setMedCategory] = useState('Analgesic');
  const [medPrice, setMedPrice] = useState('50');
  const [medStock, setMedStock] = useState('100');

  // Profile State
  const [address, setAddress] = useState(myPharmRecord?.address || 'Alipiri Main Road');
  const [radius, setRadius] = useState(myPharmRecord?.deliveryRadiusKm || 10);
  const [hours, setHours] = useState(myPharmRecord?.workingHours || '08:00 AM - 10:00 PM');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    await addInventoryItem({
      pharmacyId: myPharmRecord?.id || 'pharm-101',
      name: medName,
      category: medCategory,
      price: Number(medPrice),
      stockQuantity: Number(medStock),
      isOutOfStock: Number(medStock) <= 0
    });
    setMedName('');
    setShowAddModal(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (myPharmRecord) {
      await updatePharmacyProfile(myPharmRecord.id, {
        address,
        deliveryRadiusKm: Number(radius),
        workingHours: hours
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    }
  };

  const handleBuyBooster = async () => {
    if (user) {
      await purchaseAdBooster(user.id, user.name, 'pharmacy', 'Tirupati', 1499);
      alert('Pharmacy Ad Booster activated! Your outlet will be featured on the patient home delivery screen.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 py-10">
      <SEO
        title="Pharmacy Dispensing Portal | MediTrust Platform"
        description="Pharmacy Dispensing & Inventory Management Dashboard on MediTrust - Process medicine orders, manage stock catalog, and activate local delivery boosters."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Pharmacy Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#111827] to-slate-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Pill className="w-10 h-10" />
            </div>
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase font-semibold flex items-center gap-2">
                <span>Pharmacy Outlet Workspace</span>
                {myPharmRecord?.verificationStatus === 'Active' ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">Verified & Active</span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">Pending Drug Control Approval</span>
                )}
              </div>
              <h1 className="text-2xl font-black text-white">{user?.name || 'MediTrust Express Pharmacy'}</h1>
              <p className="text-xs text-slate-400">License: {myPharmRecord?.drugLicenseNumber || 'AP-DRUG-33921'} • {myPharmRecord?.address || 'Alipiri Main Road'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Medicine Orders ({pharmacyOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Stock Inventory ({inventory.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'profile' ? 'bg-slate-700 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Outlet Profile
            </button>
            <button
              onClick={() => setActiveTab('monetization')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold ${activeTab === 'monetization' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'}`}
            >
              Ad Booster
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>Medicine Orders & Home Delivery Dispatch</span>
              </h2>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {pharmacyOrders.length} Incoming Orders
              </span>
            </div>

            {pharmacyOrders.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-[#0B1120] border border-slate-800">
                <p className="text-xs text-slate-400">No active medicine orders.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pharmacyOrders.map(order => (
                  <div key={order.id} className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-amber-400">{order.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">{order.deliveryType}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{order.patientName} ({order.patientPhone})</h3>
                      <p className="text-xs text-slate-400"><MapPin className="w-3 h-3 inline mr-1 text-slate-500" />{order.patientAddress}</p>
                      
                      <div className="pt-2 flex flex-wrap gap-2">
                        {order.items.map((it, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#111827] border border-slate-700 text-xs font-mono text-slate-300">
                            {it.name} x{it.quantity} (₹{it.price})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2 shrink-0">
                      <div className="text-lg font-extrabold text-emerald-400">Total: ₹{order.totalAmount}</div>
                      <div className="text-xs font-mono text-slate-400">Status: <strong className="text-amber-400">{order.status}</strong></div>

                      {/* Status Update Buttons */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <button
                          onClick={() => updatePharmacyOrderStatus(order.id, 'Preparing')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px]"
                        >
                          Preparing
                        </button>
                        <button
                          onClick={() => updatePharmacyOrderStatus(order.id, 'Out for Delivery')}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px]"
                        >
                          Out for Delivery
                        </button>
                        <button
                          onClick={() => updatePharmacyOrderStatus(order.id, 'Delivered')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INVENTORY CATALOG */}
        {activeTab === 'inventory' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">In-Stock Medicine Inventory</h2>
                <p className="text-xs text-slate-400">Manage medicine catalog and real-time availability synchronized with Supabase.</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Medicine</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0B1120] text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Medicine Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock Quantity</th>
                    <th className="p-3">Availability</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {inventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">{item.name}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono">{item.category}</span></td>
                      <td className="p-3 font-bold text-emerald-400">₹{item.price}</td>
                      <td className="p-3 font-mono">{item.stockQuantity} units</td>
                      <td className="p-3">
                        {item.isOutOfStock ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold">Out of Stock</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">In Stock</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => updateInventoryItem(item.id, { isOutOfStock: !item.isOutOfStock })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px]"
                        >
                          Toggle Stock
                        </button>
                        <button
                          onClick={() => deleteInventoryItem(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 font-bold text-[10px]"
                        >
                          <Trash2 className="w-3 h-3 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADD MEDICINE MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-[#111827] border border-slate-700 p-6 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">Add New Medicine to Catalog</h3>
              <form onSubmit={handleAddMedicine} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Medicine Name *</label>
                  <input type="text" required value={medName} onChange={e => setMedName(e.target.value)} placeholder="e.g. Paracetamol 650mg" className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Category *</label>
                  <input type="text" required value={medCategory} onChange={e => setMedCategory(e.target.value)} placeholder="e.g. Antibiotic / Cardiac" className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Price (₹) *</label>
                    <input type="number" required value={medPrice} onChange={e => setMedPrice(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Stock Quantity *</label>
                    <input type="number" required value={medStock} onChange={e => setMedStock(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
                    Add Medicine
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: OUTLET PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-slate-800 space-y-4 max-w-xl mx-auto">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Edit Pharmacy Outlet Profile</h2>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                Profile updated in Supabase in real time!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Street Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Home Delivery Radius (km)</label>
                <input type="number" value={radius} onChange={e => setRadius(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Working Hours</label>
                <input type="text" value={hours} onChange={e => setHours(e.target.value)} className="w-full px-4 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-white text-sm" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20">
                Save Profile
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: AD BOOSTERS */}
        {activeTab === 'monetization' && (
          <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-semibold">Home Delivery Visibility</span>
                <h2 className="text-xl font-bold text-white">MediTrust Pharmacy Delivery Boosters</h2>
                <p className="text-xs text-slate-400">Rank #1 in home medicine delivery search results across Tirupati for 30 days.</p>
              </div>
              <button onClick={handleBuyBooster} className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Activate Pharmacy Ad Booster (₹1,499/mo)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
