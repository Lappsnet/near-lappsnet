import { rewardsData } from "@/utils/data-rewards";

export default function Rewards() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-14 my-10 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mt-4">
        Exclusive Rewards Tiers for Maximizing Your Benefits
      </h1>
      <p className="text-base md:text-lg max-w-3xl mt-4 text-transparent bg-clip-text leading-relaxed bg-gradient-to-r from-slate-800 to-slate-400">
        Unlock a range of exclusive benefits based on your reward points with
        XFY&apos;s tiered loyalty program.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-6">
        {rewardsData.rewardsProgram.tiers.map((tier, index) => (
          <div
            key={index}
            className={`flex flex-col p-4 rounded-lg border border-gray-300 shadow-sm transition duration-300 ease-in-out ${tier.color}`}
          >
            <h6 className="mb-4 text-xl font-medium ">
              {tier.name}
            </h6>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-xl font-semibold">{tier.eligibility}</span>
            </div>
            <ul role="list" className="space-y-2 my-3">
              {tier.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500">
                    {benefit.icon}
                  </span>
                  <span className="text-base font-normal ms-3">
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
