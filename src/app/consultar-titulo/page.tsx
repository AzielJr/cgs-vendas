'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Search, Camera, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TituloConsulta {
  numero: string;
  extracao: string;
  status: 'vendido' | 'disponivel' | 'reservado';
  cliente?: string;
  dataVenda?: string;
  vendedor?: string;
}

export default function ConsultarTituloPage() {
  const [extracaoSelecionada, setExtracaoSelecionada] = useState('');
  const [numeroTitulo, setNumeroTitulo] = useState('');
  const [resultado, setResultado] = useState<TituloConsulta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const abrirCamera = async () => {
    try {
      setMostrarCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Erro ao acessar a câmera. Verifique as permissões.');
    }
  };

  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      
      // Simular leitura de código de barras
      const codigoSimulado = Math.floor(Math.random() * 900000) + 100000;
      setNumeroTitulo(codigoSimulado.toString());
      
      fecharCamera();
    }
  };

  const fecharCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setMostrarCamera(false);
  };

  const handleConsulta = async () => {
    if (!extracaoSelecionada || !numeroTitulo) {
      alert('Por favor, selecione a extração e digite o número do título');
      return;
    }

    setIsLoading(true);
    
    // Simulação de consulta
    setTimeout(() => {
      // Simular diferentes status baseado no número
      const ultimoDigito = parseInt(numeroTitulo.slice(-1));
      let status: 'vendido' | 'disponivel' | 'reservado';
      let cliente = '';
      let dataVenda = '';
      let vendedor = '';

      if (ultimoDigito % 3 === 0) {
        status = 'vendido';
        cliente = 'João Silva Santos';
        dataVenda = '15/12/2024';
        vendedor = 'Maria Vendedora';
      } else if (ultimoDigito % 3 === 1) {
        status = 'reservado';
        cliente = 'Ana Costa Lima';
        vendedor = 'Pedro Vendedor';
      } else {
        status = 'disponivel';
      }

      setResultado({
        numero: numeroTitulo,
        extracao: extracaoSelecionada,
        status,
        cliente,
        dataVenda,
        vendedor
      });
      setIsLoading(false);
    }, 1000);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'vendido':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          text: 'Vendido'
        };
      case 'reservado':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          text: 'Reservado'
        };
      case 'disponivel':
        return {
          icon: XCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          text: 'Disponível'
        };
      default:
        return {
          icon: XCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          text: 'Desconhecido'
        };
    }
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
                <h1 className="text-xl font-bold text-gray-800">Consultar Título</h1>
                <p className="text-gray-600">Sistema de Vendas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 relative z-20">
        {/* Formulário de Consulta */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Consultar Status do Título</h2>
            <p className="text-gray-600">Selecione a extração e digite o número do título</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extração *
              </label>
              <select
                value={extracaoSelecionada}
                onChange={(e) => setExtracaoSelecionada(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do Título *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={numeroTitulo}
                  onChange={(e) => setNumeroTitulo(e.target.value.replace(/\D/g, ''))}
                  placeholder="Digite o número do título"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={abrirCamera}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  title="Escanear código"
                >
                  <Camera className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            <button
              onClick={handleConsulta}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>Consultar Título</>
              )}

        {/* Modal da Câmera */}
        {mostrarCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Escanear Código</h3>
                <p className="text-gray-600">Posicione o código de barras na câmera</p>
              </div>
              
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={capturarFoto}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Capturar
                </button>
                <button
                  onClick={fecharCamera}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
            </button>
          </div>
        </div>

        {/* Resultado da Consulta */}
        {resultado && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Resultado da Consulta
            </h3>

            <div className="space-y-6">
              {/* Status */}
              <div className={`${getStatusInfo(resultado.status).bgColor} ${getStatusInfo(resultado.status).borderColor} border-2 rounded-lg p-6`}>
                <div className="flex items-center justify-center mb-4">
                  {(() => {
                    const StatusIcon = getStatusInfo(resultado.status).icon;
                    return <StatusIcon className={`h-12 w-12 ${getStatusInfo(resultado.status).color}`} />;
                  })()}
                </div>
                <div className="text-center">
                  <h4 className={`text-2xl font-bold ${getStatusInfo(resultado.status).color} mb-2`}>
                    {getStatusInfo(resultado.status).text}
                  </h4>
                  <p className="text-gray-600">
                    Título {resultado.numero} - Extração {resultado.extracao}
                  </p>
                </div>
              </div>

              {/* Informações Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Número do Título</h5>
                  <p className="text-gray-900 text-lg">{resultado.numero}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-700 mb-2">Extração</h5>
                  <p className="text-gray-900 text-lg">{resultado.extracao}</p>
                </div>
              </div>

              {/* Informações do Cliente (se vendido ou reservado) */}
              {(resultado.status === 'vendido' || resultado.status === 'reservado') && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-700 mb-4">Informações da Venda</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultado.cliente && (
                      <div>
                        <span className="text-sm text-gray-600">Cliente:</span>
                        <p className="font-medium text-gray-900">{resultado.cliente}</p>
                      </div>
                    )}
                    {resultado.vendedor && (
                      <div>
                        <span className="text-sm text-gray-600">Vendedor:</span>
                        <p className="font-medium text-gray-900">{resultado.vendedor}</p>
                      </div>
                    )}
                    {resultado.dataVenda && (
                      <div>
                        <span className="text-sm text-gray-600">Data da Venda:</span>
                        <p className="font-medium text-gray-900">{resultado.dataVenda}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => {
                  setResultado(null);
                  setNumeroTitulo('');
                  setExtracaoSelecionada('');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Nova Consulta
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