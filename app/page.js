import CVUploader from '@/components/cv-uploader'
import HorizontalCard from '@/components/HorizontalCard'
import JDUploader from '@/components/jd-uploader'
import InputCard from '@/components/top-n-inputcard'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">CV Matcher</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <CVUploader />
        <JDUploader />
      </div>
      <div className="my-5"> {/* Added margin and max width */}
        <HorizontalCard />
      </div>
      <div className="my-5"> {/* Added margin for spacing */}
        <InputCard/>
      </div>
    </main>
  )
}

