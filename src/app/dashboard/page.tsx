'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Search, BarChart3, Users, LogOut, TrendingUp, DollarSign } from 'lucide-react';

interface Vendedor {
  username: string;
  id?: string;
}

export default function DashboardPage() {
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const vendedorData = localStorage.getItem('vendedor');
    if (!vendedorData) {
      router.push('/login');
    } else {
      setVendedor(JSON.parse(vendedorData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('vendedor');
    router.push('/login');
  };

  if (!vendedor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const menuOptions = [
    {
      title: 'Vender Título',
      description: 'Realizar nova venda de cartelas',
      icon: ShoppingCart,
      href: '/vender-titulo',
      gradient: 'from-emerald-500 to-green-600',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Consultar Título',
      description: 'Verificar status e informações',
      icon: Search,
      href: '/consultar-titulo',
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Minhas Vendas',
      description: 'Relatórios e prestação de contas',
      icon: BarChart3,
      href: '/minhas-vendas',
      gradient: 'from-purple-500 to-violet-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Clientes',
      description: 'Gerenciar cadastro de clientes',
      icon: Users,
      href: '/clientes',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
  ];

  const stats = [
    {
      title: 'Vendas Hoje',
      value: '12',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total do Mês',
      value: 'R$ 2.450',
      icon: DollarSign,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo-empresa.png"
                  alt="Logo da Empresa"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">CGS Vendas</h1>
                <p className="text-sm text-gray-600">Olá, {vendedor.username}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Gerencie suas vendas e clientes de forma eficiente</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={index}
                onClick={() => router.push(option.href)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 p-6 hover:border-gray-300">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${option.iconBg} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`h-8 w-8 ${option.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      
      {/* Footer Fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-600 py-1 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs">
            © 2025 CGS • Sistema de Vendas - Versão 1.0
          </div>
        </div>
      </footer>
    </div>
  );
}