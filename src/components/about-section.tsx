/* eslint-disable @next/next/no-img-element */
export default async function AboutSection() {
  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-12 md:py-24 px-6 md:px-12 h-screen">
      {/* Texto de la Sección */}
      <div className="w-full md:w-2/3 flex flex-col justify-center items-start font-sans mb-10 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10">
          About XFY D-Money
        </h1>
        <p className="text-base md:text-2xl text-transparent bg-clip-text leading-relaxed md:leading-relaxed bg-gradient-to-r from-slate-800 to-slate-400">
          XFY Digital-Money is a cutting-edge financial platform revolutionizing
          how you manage and grow your money. By converting your deposits into
          stablecoins through trusted commercial banks, we ensure your funds are
          secure, earning interest, and primed for future financial
          opportunities.
        </p>
      </div>

      {/* Imagen y Datos del CEO */}
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <img
          src="/jon-ceo.jpg"
          alt="Jonathan Cruz - CEO"
          className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover mb-6"
        />
        <p className="text-xl font-semibold text-center">Jonathan Cruz</p>
        <p className="text-sm md:text-base text-gray-600 text-center mt-1">
          CEO
        </p>
        <img
          src="/solologo.png"
          alt="XFY Tokenization Engine"
          className="w-10 h-10 md:w-20 md:h-20 rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
