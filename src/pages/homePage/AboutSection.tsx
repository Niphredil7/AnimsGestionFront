export default function AboutSection() {
  return (
    <section
      id="accueil"
      className="
        scroll-mt-24
        min-h-screen        
        bg-[#F5F5F5] text-gray-900 font-semibold
        px-6 py-12 pt-32      
        md:px-20
        lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10
      "
    >
      {/* Texte à gauche */}
      <div className="flex flex-col items-center lg:items-start lg:h-full lg:justify-between ">
        {/* logo */}
        <div className="mb-6 flex justify-center xl:justify-end w-full">
          <img
            src="/AnimsGestionLogo.png"
            alt="Logo Anim's Gestion"
            className="w-48 h-auto md:w-64 lg:w-100"
          />
        </div>

        {/* texte */}
        <div className="w-full max-w-2xl mt-4 lg:mt-auto">
          <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-semibold mb-6 leading-snug text-gray-900">
            Une plateforme faisant un lien direct entre{" "}
            <span className="text-orange-500 font-bold">parents</span> et{" "}
            <span className="text-orange-500 font-bold">animateurs</span>.
          </h1>

          <p className="text-gray-900 mb-4 leading-relaxed md:text-xl lg:text-3xl">
            Créez et participez aux meilleures activités pour enfants.
            Ayez un regard sur les animations de vos enfants.
            Proposez des sorties scolaires via la plateforme,
            et ajoutez vos activités préférées dans vos favoris !
          </p>

          <p className="text-gray-900 leading-relaxed md:text-xl lg:text-3xl">
            Organisez vos activités et votre matériel pour vos animations.
            Découvrez comment votre activité a été retenue
            et tenez-vous informé de tous les événements de votre école.
          </p>
        </div>
      </div>

      {/* Vidéo */}
      <div className="w-full flex justify-center items-end lg:pt-0">
        <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
            title="Tutoriel"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
