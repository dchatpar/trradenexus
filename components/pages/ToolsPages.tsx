
import React, { useState } from 'react';
import { PageHeader, GlassCard, Button, Input } from '../common/Shared';
import { DocumentTextIcon, CalculatorIcon, ArrowDownTrayIcon } from '../Icons';
import { getGeminiResponse } from '../../services/geminiService';

// --- Document Generator ---
export const DocumentGeneratorPage: React.FC = () => {
    const [formData, setFormData] = useState({
        exporter: '',
        importer: '',
        date: new Date().toISOString().split('T')[0],
        invoiceNo: 'INV-001',
        description: '',
        value: ''
    });
    const [generatedTerms, setGeneratedTerms] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateTerms = async () => {
        setLoading(true);
        const prompt = `Generate standard commercial invoice terms for exporting ${formData.description || 'goods'} from ${formData.exporter || 'Seller'} to ${formData.importer || 'Buyer'}. Include payment terms and incoterms.`;
        const res = await getGeminiResponse(prompt);
        setGeneratedTerms(res);
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Trade Document Generator" subtitle="Create Commercial Invoices & Packing Lists instantly" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <GlassCard className="p-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <DocumentTextIcon className="h-5 w-5 text-blue-400"/> Document Details
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Invoice Number" value={formData.invoiceNo} onChange={e => setFormData({...formData, invoiceNo: e.target.value})} />
                            <Input label="Date" type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                        </div>
                        <Input label="Exporter (Seller)" placeholder="Company Name, Address" value={formData.exporter} onChange={e => setFormData({...formData, exporter: e.target.value})} />
                        <Input label="Importer (Buyer)" placeholder="Company Name, Address" value={formData.importer} onChange={e => setFormData({...formData, importer: e.target.value})} />
                        <Input label="Description of Goods" placeholder="e.g. 5000 units of Cotton T-Shirts" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        <Input label="Total Value (USD)" type="number" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} />
                        
                        <div className="pt-4 border-t border-white/10">
                            <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Terms & Conditions (AI Assisted)</label>
                            <textarea 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white text-sm h-32 mb-2"
                                value={generatedTerms}
                                onChange={e => setGeneratedTerms(e.target.value)}
                                placeholder="Terms will appear here..."
                            />
                            <Button variant="secondary" size="sm" onClick={handleGenerateTerms} disabled={loading}>
                                {loading ? 'Drafting...' : 'Auto-Draft Terms'}
                            </Button>
                        </div>
                    </div>
                </GlassCard>

                {/* Live Preview */}
                <div className="bg-white text-slate-900 rounded-xl p-8 shadow-2xl min-h-[600px] relative font-serif text-sm">
                    <div className="absolute top-4 right-4">
                        <Button size="sm" className="shadow-none bg-slate-900 text-white hover:bg-slate-800">
                            <ArrowDownTrayIcon className="h-4 w-4 mr-1"/> PDF
                        </Button>
                    </div>
                    
                    <h1 className="text-2xl font-bold uppercase mb-8 border-b-2 border-slate-900 pb-2">Commercial Invoice</h1>
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold uppercase text-xs text-slate-500 mb-1">Exporter</h4>
                            <p className="whitespace-pre-wrap">{formData.exporter || '[Exporter Details]'}</p>
                        </div>
                        <div className="text-right">
                            <p><span className="font-bold">Invoice #:</span> {formData.invoiceNo}</p>
                            <p><span className="font-bold">Date:</span> {formData.date}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="font-bold uppercase text-xs text-slate-500 mb-1">Consignee</h4>
                        <p className="whitespace-pre-wrap">{formData.importer || '[Importer Details]'}</p>
                    </div>

                    <table className="w-full mb-8 border-collapse">
                        <thead>
                            <tr className="bg-slate-100 border-y border-slate-300">
                                <th className="text-left py-2 px-2">Description</th>
                                <th className="text-right py-2 px-2">Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-4 px-2 border-b border-slate-200">{formData.description || 'Item description...'}</td>
                                <td className="py-4 px-2 border-b border-slate-200 text-right">{formData.value ? `$${Number(formData.value).toLocaleString()}` : '$0.00'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <h4 className="font-bold uppercase text-xs text-slate-500 mb-2">Terms & Conditions</h4>
                        <p className="text-xs text-slate-600 whitespace-pre-wrap">{generatedTerms || 'Terms not yet specified.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Landed Cost Calculator ---
export const TradeCalculatorPage: React.FC = () => {
    const [values, setValues] = useState({
        productValue: 10000,
        shipping: 1500,
        insurance: 200,
        dutyRate: 15,
        vatRate: 20
    });

    const duty = values.productValue * (values.dutyRate / 100);
    const cif = values.productValue + values.shipping + values.insurance;
    const vat = (cif + duty) * (values.vatRate / 100);
    const total = cif + duty + vat;

    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title="Landed Cost Calculator" subtitle="Estimate total cost of import including Duty & Taxes" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <GlassCard className="p-6 h-fit">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <CalculatorIcon className="h-5 w-5 text-green-400"/> Cost Inputs
                    </h3>
                    <div className="space-y-4">
                        <Input label="Product Value (USD)" type="number" value={values.productValue} onChange={e => setValues({...values, productValue: Number(e.target.value)})} />
                        <Input label="Shipping Cost (Freight)" type="number" value={values.shipping} onChange={e => setValues({...values, shipping: Number(e.target.value)})} />
                        <Input label="Insurance" type="number" value={values.insurance} onChange={e => setValues({...values, insurance: Number(e.target.value)})} />
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Duty Rate (%)" type="number" value={values.dutyRate} onChange={e => setValues({...values, dutyRate: Number(e.target.value)})} />
                            <Input label="VAT / GST (%)" type="number" value={values.vatRate} onChange={e => setValues({...values, vatRate: Number(e.target.value)})} />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard className="lg:col-span-2 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>
                    
                    <div className="relative z-10 w-full max-w-lg">
                        <h3 className="text-center text-slate-400 uppercase text-sm font-bold tracking-widest mb-8">Total Landed Cost</h3>
                        
                        <div className="text-center mb-12">
                            <span className="text-6xl font-bold text-white tracking-tight">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-white/5">
                                <span className="text-slate-300">Product Value (FOB)</span>
                                <span className="font-mono text-white">${values.productValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-white/5">
                                <span className="text-slate-300">Freight & Insurance</span>
                                <span className="font-mono text-white">${(values.shipping + values.insurance).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                                <span className="text-red-200">Customs Duty ({values.dutyRate}%)</span>
                                <span className="font-mono text-red-200">+ ${duty.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                                <span className="text-red-200">VAT / Taxes ({values.vatRate}%)</span>
                                <span className="font-mono text-red-200">+ ${vat.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
