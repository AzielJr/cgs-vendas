'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { ArrowLeft, Calendar, BarChart3, DollarSign, FileText, QrCode } from 'lucide-react';

interface Venda {
  id: string;
  titulo: string;
  cliente: string;
  comissao: number;
  valor: number;
  data: string;
  extracao: string;
}

interface RelatorioVendas {
  vendas: Venda[];
  totalTitulos: number;
  totalComissao: number;
  valorTotal: number;
  periodo: string;
}

export default function MinhasVendasPage() {
  const [tipoConsulta, setTipoConsulta] = useState<'periodo' | 'extracao'>('periodo');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [extracaoSelecionada, setExtracaoSelecionada] = useState('');
  const [relatorio, setRelatorio] = useState<RelatorioVendas | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [extracoes] = useState([
    '001/2024',
    '002/2024',
    '003/2024',
    '004/2024',
    '005/2024'
  ]);
  const router = useRouter();

  useEffect(() => {
    const vendedorData = localStorage.getItem('vendedor');
    if (!vendedorData) {
      router.push('/login');
    }
  }, [router]);

  const gerarRelatorio = async () => {
    if (tipoConsulta === 'periodo' && (!dataInicial || !dataFinal)) {
      alert('Por favor, selecione o período inicial e final');
      return;
    }
    if (tipoConsulta === 'extracao' && !extracaoSelecionada) {
      alert('Por favor, selecione a extração');
      return;
    }

    setIsLoading(true);
    
    // Simulação de dados de vendas
    setTimeout(() => {
      const vendasSimuladas: Venda[] = [
        {
          id: '1',
          titulo: '123456',
          cliente: 'João Silva Santos',
          comissao: 2.50,
          valor: 25.00,
          data: '15/12/2024',
          extracao: '001/2024'
        },
        {
          id: '2',
          titulo: '789012',
          cliente: 'Maria Costa Lima',
          comissao: 2.50,
          valor: 25.00,
          data: '16/12/2024',
          extracao: '001/2024'
        },
        {
          id: '3',
          titulo: '345678',
          cliente: 'Pedro Oliveira',
          comissao: 2.50,
          valor: 25.00,
          data: '17/12/2024',
          extracao: '002/2024'
        },
        {
          id: '4',
          titulo: '901234',
          cliente: 'Ana Souza',
          comissao: 2.50,
          valor: 25.00,
          data: '18/12/2024',
          extracao: '002/2024'
        },
        {
          id: '5',
          titulo: '567890',
          cliente: 'Carlos Ferreira',
          comissao: 2.50,
          valor: 25.00,
          data: '19/12/2024',
          extracao: '003/2024'
        }
      ];

      let vendasFiltradas = vendasSimuladas;
      let periodo = '';

      if (tipoConsulta === 'extracao') {
        vendasFiltradas = vendasSimuladas.filter(v => v.extracao === extracaoSelecionada);
        periodo = `Extração ${extracaoSelecionada}`;
      } else {
        periodo = `${dataInicial} a ${dataFinal}`;
      }

      const totalTitulos = vendasFiltradas.length;
      const totalComissao = vendasFiltradas.reduce((sum, venda) => sum + venda.comissao, 0);
      const valorTotal = vendasFiltradas.reduce((sum, venda) => sum + venda.valor, 0);

      setRelatorio({
        vendas: vendasFiltradas,
        totalTitulos,
        totalComissao,
        valorTotal,
        periodo
      });
      setIsLoading(false);
    }, 1000);
  };

  const gerarQRCodePIX = () => {
    setShowQRCode(true);
  };

  // Dados simulados para PIX
  const pixData = {
    chave: '12345678901',
    valor: relatorio?.valorTotal || 0,
    descricao: `Prestação de contas - ${relatorio?.periodo || ''}`
  };

  const pixString = `00020126580014BR.GOV.BCB.PIX0136${pixData.chave}0208${pixData.descricao}5204000053039865802BR5925EMPRESA DE CAPITALIZACAO6009SAO PAULO62070503***6304`;

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
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-2">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
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
              <div>
                <h1 className="text-xl font-bold text-gray-800">Minhas Vendas</h1>
                <p className="text-gray-600">Sistema de Vendas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 relative z-20">
        {/* Formulário de Consulta */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Relatório de Vendas</h2>
            <p className="text-gray-600">Consulte suas vendas por período ou extração</p>
          </div>

          {/* Tipo de Consulta */}
          <div className="mb-6">
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setTipoConsulta('periodo')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  tipoConsulta === 'periodo'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Por Período
              </button>
              <button
                onClick={() => setTipoConsulta('extracao')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  tipoConsulta === 'extracao'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Por Extração
              </button>
            </div>
          </div>

          {/* Campos de Consulta */}
          <div className="space-y-6">
            {tipoConsulta === 'periodo' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Inicial *
                  </label>
                  <input
                    type="date"
                    value={dataInicial}
                    onChange={(e) => setDataInicial(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Final *
                  </label>
                  <input
                    type="date"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extração *
                </label>
                <select
                  value={extracaoSelecionada}
                  onChange={(e) => setExtracaoSelecionada(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione a extração</option>
                  {extracoes.map((extracao) => (
                    <option key={extracao} value={extracao}>
                      Extração {extracao}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={gerarRelatorio}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Gerar Relatório'
              )}
            </button>
          </div>
        </div>

        {/* Relatório */}
        {relatorio && (
          <div className="space-y-8">
            {/* Resumo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-blue-100 mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total de Títulos</p>
                  <p className="text-2xl font-bold text-gray-900">{relatorio.totalTitulos}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-orange-100 mb-3">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Comissão</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {relatorio.totalComissao.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-green-100 mb-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Valor Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {relatorio.valorTotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center col-span-2 lg:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-purple-100 mb-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Período</p>
                  <p className="text-lg font-bold text-gray-900">{relatorio.periodo}</p>
                </div>
              </div>
            </div>

            {/* Lista de Vendas */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Detalhes das Vendas</h3>
              
              {relatorio.vendas.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comissão</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {relatorio.vendas.map((venda, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venda.data}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venda.cliente}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venda.titulo}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">R$ {venda.valor.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">R$ {venda.comissao.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhuma venda encontrada para o período selecionado.</p>
                </div>
              )}
            </div>

            {/* Prestação de Contas */}
            {relatorio.vendas.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Prestação de Contas</h3>
                
                {!showQRCode ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">
                      Gere um QR Code PIX para realizar a prestação de contas do valor total de vendas.
                    </p>
                    <button
                      onClick={gerarQRCodePIX}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center mx-auto"
                    >
                      <QrCode className="h-5 w-5 mr-2" />
                      Gerar QR Code PIX
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 inline-block mb-6">
                      <QRCode
                        value={pixString}
                        size={200}
                        level="M"
                      />
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-green-800 mb-2">Informações do PIX</h4>
                      <div className="text-sm text-green-700">
                        <p><strong>Valor:</strong> R$ {pixData.valor.toFixed(2)}</p>
                        <p><strong>Descrição:</strong> {pixData.descricao}</p>
                        <p><strong>Chave PIX:</strong> {pixData.chave}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQRCode(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Fechar QR Code
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}