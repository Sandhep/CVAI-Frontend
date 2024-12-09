import CVUploader from '@/components/cv-uploader'
import JDUploader from '@/components/jd-uploader'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">CV Matcher</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <CVUploader />
        <JDUploader />
      </div>
    </main>
  )
}

