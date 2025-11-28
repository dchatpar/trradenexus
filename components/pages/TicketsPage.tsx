
import React, { useState } from 'react';
import { PageHeader, GlassCard, DataTable, Button, Badge } from '../common/Shared';
import { TicketIcon, ChatBubbleLeftRightIcon } from '../Icons';

const TicketsPage: React.FC = () => {
  const [tickets] = useState([
    { id: 'T-1024', subject: 'Data discrepancy in China Export', status: 'Open', priority: 'High', date: 'Oct 24, 2025' },
    { id: 'T-1023', subject: 'Billing inquiry for Enterprise Plan', status: 'Closed', priority: 'Medium', date: 'Oct 20, 2025' },
    { id: 'T-1022', subject: 'Feature request: API Access', status: 'Pending', priority: 'Low', date: 'Oct 15, 2025' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Ticket Management" 
        subtitle="Track your support requests and inquiries" 
        action={<Button><TicketIcon className="h-4 w-4 mr-2" /> New Ticket</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <DataTable headers={['Ticket ID', 'Subject', 'Status', 'Priority', 'Date', 'Action']}>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-gray-400">{ticket.id}</td>
                <td className="px-6 py-4 font-medium text-white">{ticket.subject}</td>
                <td className="px-6 py-4">
                  <Badge color={ticket.status === 'Open' ? 'green' : ticket.status === 'Closed' ? 'gray' : 'yellow'}>
                    {ticket.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold ${
                    ticket.priority === 'High' ? 'text-red-400' : 
                    ticket.priority === 'Medium' ? 'text-blue-400' : 'text-gray-400'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{ticket.date}</td>
                <td className="px-6 py-4">
                  <button className="text-brand-400 hover:text-brand-300 text-sm font-medium">View</button>
                </td>
              </tr>
            ))}
          </DataTable>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6 bg-gradient-to-br from-blue-900/20 to-slate-900/50">
            <h3 className="text-lg font-bold text-white mb-2">Priority Support</h3>
            <p className="text-sm text-gray-400 mb-4">Enterprise plans include dedicated account managers and 24/7 priority support response times.</p>
            <div className="flex items-center gap-3 text-sm text-blue-300 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              Average Response: &lt; 2 Hours
            </div>
            <Button variant="secondary" fullWidth>Contact Manager</Button>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Help Resources</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-brand-400 cursor-pointer transition-colors">• Knowledge Base</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">• API Documentation</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">• Community Forums</li>
              <li className="hover:text-brand-400 cursor-pointer transition-colors">• System Status</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
