const CourseCurriculum: React.FC = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-primary text-center mb-6">Course Chapters</h2>
        <div className="mx-auto max-w-4xl grid grid-flow-row gap-10">
          <div>
            <h3 className="text-secondary caption mb-5">Chapter title</h3>
            <div className="grid grid-flow-row shadow-lg">
              <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-grey-light duration-300">
                <div>
                  <h6 className="text-black">1- Lesson title</h6>
                  <p className="opacity-60">Learn the fundamentals of Next.js</p>
                </div>
                <div>
                  <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>
                  <p className="text-base bg-grey-light text-black px-1">8:05</p>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:scale-105 hover:bg-grey-light duration-200">
                <div>
                  <h6 className="text-black">2- Lesson title</h6>
                  <p className="opacity-60">Learn the fundamentals of Next.js</p>
                </div>
                <div>
                  <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>
                  <p className="text-base bg-grey-light text-black px-1">8:05</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-secondary caption mb-5">Chapter title</h3>
            <div className="grid grid-flow-row shadow-lg">
              <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-grey-light duration-300">
                <div>
                  <h6 className="text-black">1- Lesson title</h6>
                  <p className="opacity-60">Learn the fundamentals of Next.js</p>
                </div>
                <div>
                  <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>
                  <p className="text-base bg-grey-light text-black px-1">8:05</p>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-between items-center bg-white transition ease-in-out delay-150 hover:scale-105 hover:bg-grey-light duration-200">
                <div>
                  <h6 className="text-black">2- Lesson title</h6>
                  <p className="opacity-60">Learn the fundamentals of Next.js</p>
                </div>
                <div>
                  <p className="text-base bg-green-400 text-white px-1 mb-2">Free</p>
                  <p className="text-base bg-grey-light text-black px-1">8:05</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CourseCurriculum