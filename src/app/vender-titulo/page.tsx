'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Camera, User, Phone, Mail, MapPin, CreditCard, CheckCircle, Loader2, Search } from 'lucide-react';

interface Cliente {
  cpf: string;
  nome: string;
  celular: string;
  email: string;
  cep: string;
}

interface Vendedor {
  username: string;
  id?: string;
}

export default function VenderTituloPage() {
  const [step, setStep] = useState(1); // 1: Código de barras, 2: Dados do cliente, 3: Confirmação
  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [cliente, setCliente] = useState<Cliente>({
    cpf: '',
    nome: '',
    celular: '',
    email: '',
    cep: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tituloInfo, setTituloInfo] = useState<{ numero: string; extracao: string; valor: number; disponivel: boolean } | null>(null);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const vendedorData = localStorage.getItem('vendedor');
    if (!vendedorData) {
      router.push('/login');
    }
  }, [router]);

  const handleCodigoBarras = async () => {
    if (!codigoBarras) {
      alert('Por favor, digite o código de barras');
      return;
    }

    setIsLoading(true);
    
    // Simulação de verificação do título
    setTimeout(() => {
      // Simular título disponível
      setTituloInfo({
        numero: codigoBarras,
        extracao: '001/2024',
        valor: 25.00,
        disponivel: true
      });
      setStep(2);
      setIsLoading(false);
    }, 1000);
  };

  const handleClienteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de venda
    setTimeout(() => {
      setStep(3);
      setIsLoading(false);
    }, 1500);
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

  const abrirCamera = async () => {
    try {
      setMostrarCamera(true)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Câmera traseira
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error)
      alert('Erro ao acessar a câmera. Verifique as permissões.')
    }
  }

  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0)
      
      // Simular leitura de código de barras
      const codigoSimulado = Math.floor(Math.random() * 900000) + 100000
      setCodigoBarras(codigoSimulado.toString())
      
      // Fechar câmera
      fecharCamera()
      
      // Simular verificação do título
      handleCodigoBarras()
    }
  }

  const fecharCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    setMostrarCamera(false)
  }

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
              <div>
                <h1 className="text-xl font-bold text-gray-800">Vender Título</h1>
                <p className="text-gray-600">Sistema de Vendas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 relative z-20">
        {/* Step 1: Código de Barras */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Código de Barras</h2>
              <p className="text-gray-600">Digite ou escaneie o código de barras do título</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Barras
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                    placeholder="Digite o código de barras"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  />
                  <button
                    onClick={abrirCamera}
                    className="absolute right-3 top-3 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Capturar com câmera"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleCodigoBarras}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Verificar Título'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Dados do Cliente */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Dados do Cliente</h2>
              <p className="text-gray-600">Preencha as informações do cliente</p>
            </div>

            {tituloInfo && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Informações do Título</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">Número:</span> {tituloInfo.numero}
                  </div>
                  <div>
                    <span className="text-blue-600">Extração:</span> {tituloInfo.extracao}
                  </div>
                  <div>
                    <span className="text-blue-600">Valor:</span> R$ {tituloInfo.valor.toFixed(2)}
                  </div>
                  <div>
                    <span className="text-blue-600">Status:</span> Disponível
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleClienteSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      onChange={(e) => setCliente({...cliente, cep: formatCEP(e.target.value)})}
                      placeholder="00000-000"
                      maxLength={9}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
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
                    'Finalizar Venda'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Confirmação */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Venda Realizada com Sucesso!</h2>
            <p className="text-gray-600 mb-6">
              O título foi vendido e o cliente receberá uma confirmação via WhatsApp.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Resumo da Venda</h3>
              <div className="text-sm text-green-700">
                <p><strong>Cliente:</strong> {cliente.nome}</p>
                <p><strong>Título:</strong> {tituloInfo?.numero}</p>
                <p><strong>Valor:</strong> R$ {tituloInfo?.valor.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setStep(1);
                  setCodigoBarras('');
                  setCliente({ cpf: '', nome: '', celular: '', email: '', cep: '' });
                  setTituloInfo(null);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Nova Venda
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

      {/* Modal da Câmera */}
      {mostrarCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Capturar Código de Barras</h3>
              <p className="text-sm text-gray-600">Posicione o código de barras na câmera</p>
            </div>
            
            <div className="relative mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg bg-gray-900"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={fecharCamera}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={capturarFoto}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Capturar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}