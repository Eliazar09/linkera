import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔍</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Página não encontrada</h1>
        <p className="text-muted mb-8 max-w-md">
          Este usuário não existe ou sua página não está publicada.
        </p>
        <Link
          href="/"
          className="glow-button inline-flex items-center gap-2"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
