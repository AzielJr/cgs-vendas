'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Search, User, UserPlus, Phone, Mail, MapPin, CreditCard, Save, Edit } from 'lucide-react';

interface Cliente {
  cpf: string;
  nome: string;
  celular: string;
  email: string;
  cep: string;
  numero: string;
  complemento: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
}

export default function ClientesPage() {
  const [step, setStep] = useState(1); // 1: Busca, 2: Cadastro/Edição, 3: Visualização
  const [cpfBusca, setCpfBusca] = useState('');
  const [cliente, setCliente] = useState<Cliente>({
    cpf: '',
    nome: '',
    celular: '',
    email: '',
    cep: '',
    numero: '',
    complemento: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clienteEncontrado, setClienteEncontrado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const vendedorData = localStorage.getItem('vendedor');
    if (!vendedorData) {
      router.push('/login');
    }
  }, [router]);

  const buscarCliente = async () => {
    if (!cpfBusca) {
      alert('Por favor, digite o CPF');
      return;
    }

    setIsLoading(true);
    
    // Simulação de busca de cliente
    setTimeout(() => {
      // Simular cliente encontrado baseado no CPF
      const ultimoDigito = parseInt(cpfBusca.replace(/\D/g, '').slice(-1));
      
      if (ultimoDigito % 2 === 0) {
        // Cliente encontrado
        setCliente({
          cpf: cpfBusca,
          nome: 'João Silva Santos',
          celular: '(11) 99999-9999',
          email: 'joao.silva@email.com',
          cep: '01234-567',
          numero: '123',
          complemento: 'Apto 45',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          uf: 'SP'
        });
        setClienteEncontrado(true);
        setStep(3);
      } else {
        // Cliente não encontrado
        setCliente({
          cpf: cpfBusca,
          nome: '',
          celular: '',
          email: '',
          cep: '',
          numero: '',
          complemento: ''
        });
        setClienteEncontrado(false);
        setStep(2);
      }
      setIsLoading(false);
    }, 1000);
  };

  const salvarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de salvamento
    setTimeout(() => {
      alert('Cliente salvo com sucesso!');
      setStep(3);
      setClienteEncontrado(true);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const buscarCEP = async (cep: string) => {
    if (cep.length === 9) {
      // Simulação de busca de CEP
      setTimeout(() => {
        setCliente({
          ...cliente,
          endereco: 'Rua das Flores',
          cidade: 'São Paulo',
          uf: 'SP'
        });
      }, 500);
    }
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 relative overflow-hidden">
      {/* Background elegante com gradientes e padrões geométricos aprimorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradiente base mais visível */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-blue-100/40 to-gray-200/50"></div>
        
        {/* Camada de textura com padrão de linhas */}
        <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 1px, transparent 1px, transparent 15px)'}}></div>
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage: 'repeating-linear-gradient(-45deg, #64748b 0px, #64748b 1px, transparent 1px, transparent 25px)'}}></div>
        
        {/* Elementos geométricos mais visíveis */}
        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-blue-300/30 rotate-45 transform"></div>
        <div className="absolute bottom-32 left-32 w-32 h-32 border-2 border-gray-400/25 rotate-12 transform"></div>
        <div className="absolute top-1/2 left-20 w-24 h-24 border border-slate-400/30 -rotate-45 transform"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-blue-400/25 rotate-30 transform"></div>
        
        {/* Gradientes de canto mais pronunciados */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-bl from-blue-200/20 via-indigo-100/15 to-transparent rounded-full blur-xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-gray-200/20 via-slate-100/15 to-transparent rounded-full blur-xl"></div>
        
        {/* Elementos decorativos adicionais */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-100/10 to-indigo-100/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-l from-slate-100/15 to-gray-100/10 rounded-full blur-xl"></div>
        
        {/* Pontos decorativos mais visíveis */}
        <div className="absolute top-16 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-500/35 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-gray-500/40 rounded-full"></div>
        <div className="absolute bottom-16 right-1/4 w-3 h-3 bg-blue-500/35 rounded-full"></div>
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-indigo-400/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-slate-400/35 rounded-full"></div>
      </div>
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-2">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/logo-empresa.png"
                  alt="Logo da Empresa"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Consultar/Cadastrar Cliente</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 relative z-20">
        {/* Step 1: Busca por CPF */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Buscar Cliente</h2>
              <p className="text-gray-600">Digite o CPF para consultar ou cadastrar um cliente</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <input
                  type="text"
                  value={cpfBusca}
                  onChange={(e) => setCpfBusca(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                onClick={buscarCliente}
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Buscar Cliente'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Cadastro/Edição */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {clienteEncontrado ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
              </h2>
              <p className="text-gray-600">
                {clienteEncontrado ? 'Atualize as informações do cliente' : 'Preencha os dados do novo cliente'}
              </p>
            </div>

            <form onSubmit={salvarCliente} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={cliente.cpf}
                    onChange={(e) => setCliente({...cliente, cpf: formatCPF(e.target.value)})}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={cliente.nome}
                    onChange={(e) => setCliente({...cliente, nome: e.target.value})}
                    placeholder="Nome completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Celular *
                  </label>
                  <input
                    type="text"
                    value={cliente.celular}
                    onChange={(e) => setCliente({...cliente, celular: formatPhone(e.target.value)})}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={cliente.email}
                    onChange={(e) => setCliente({...cliente, email: e.target.value})}
                    placeholder="email@exemplo.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cliente.cep}
                      onChange={(e) => {
                        const newCep = formatCEP(e.target.value);
                        setCliente({...cliente, cep: newCep});
                        buscarCEP(newCep);
                      }}
                      placeholder="00000-000"
                      maxLength={9}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={cliente.numero}
                    onChange={(e) => setCliente({...cliente, numero: e.target.value})}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={cliente.complemento}
                    onChange={(e) => setCliente({...cliente, complemento: e.target.value})}
                    placeholder="Apartamento, bloco, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {cliente.endereco && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={`${cliente.endereco}, ${cliente.cidade} - ${cliente.uf}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      disabled
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>Salvar Cliente</>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Visualização */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dados do Cliente</h2>
              <p className="text-gray-600">Informações cadastradas</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">CPF</h5>
                  <p className="text-gray-900">{cliente.cpf}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Nome</h5>
                  <p className="text-gray-900">{cliente.nome}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Celular</h5>
                  <p className="text-gray-900">{cliente.celular}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">E-mail</h5>
                  <p className="text-gray-900">{cliente.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">CEP</h5>
                  <p className="text-gray-900">{cliente.cep}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Número</h5>
                  <p className="text-gray-900">{cliente.numero}</p>
                </div>
                {cliente.complemento && (
                  <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                    <h5 className="font-semibold text-gray-700 mb-2">Complemento</h5>
                    <p className="text-gray-900">{cliente.complemento}</p>
                  </div>
                )}
                {cliente.endereco && (
                  <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                    <h5 className="font-semibold text-gray-700 mb-2">Endereço</h5>
                    <p className="text-gray-900">
                      {cliente.endereco}, {cliente.numero}
                      {cliente.complemento && `, ${cliente.complemento}`}
                      <br />
                      {cliente.cidade} - {cliente.uf}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => {
                  setStep(1);
                  setCpfBusca('');
                  setCliente({
                    cpf: '',
                    nome: '',
                    celular: '',
                    email: '',
                    cep: '',
                    numero: '',
                    complemento: ''
                  });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Nova Consulta
              </button>
              <button
                onClick={() => {
                  setStep(2);
                  setIsEditing(true);
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Voltar ao Menu
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}