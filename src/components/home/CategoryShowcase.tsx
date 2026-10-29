import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Compre por categoria</h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/produtos?categoria=${cat.id}`}
            className="focus-ring group flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-center transition-shadow hover:shadow-md"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-20 w-20 rounded-full object-cover transition-transform group-hover:scale-105 sm:h-24 sm:w-24"
            />
            <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
