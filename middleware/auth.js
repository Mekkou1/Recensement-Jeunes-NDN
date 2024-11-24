// middleware/auth.js

export default async function ({ redirect, $supabase }) {
  // Récupérer l'utilisateur authentifié via Supabase
  const user = $supabase.auth.user()

  if (!user) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    return redirect('/login')
  }

  // Vérifier si l'utilisateur a un rôle d'administrateur
  const { data: userData, error } = await $supabase
    .from('administrateurs') // Table des administrateurs
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !userData || userData.role !== 'admin') {
    // Si l'utilisateur n'est pas un administrateur, rediriger vers la page d'accueil ou d'erreur
    return redirect('/403') // Vous pouvez personnaliser la page d'erreur
  }
}
