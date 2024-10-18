import './style.css'

const [arm1, arm2, head, torso, legs] = [
  'arm-1', 'arm-2', 'head', 'torso', 'legs'
].map((part) => document.querySelector<HTMLImageElement>(`#${part}`))

const parts = {
  arm1: {
    element: arm1,
    filename: 'arm 1',
    pivotPosition: [.5, .5],
    timeout: 0,
  },
  arm2: {
    element: arm2,
    filename: 'arm 2',
    pivotPosition: [.5, .5],
    timeout: 0,
  },
  head: {
    element: head,
    filename: 'head',
    pivotPosition: [.5, .5],
    timeout: 0,
  },
  legs: {
    element: legs,
    filename: 'legs',
    pivotPosition: [.5, .5],
    timeout: 0,
  },
  torso: {
    element: torso,
    filename: 'torso',
    pivotPosition: [.5, .5],
    timeout: 0,
  }
} as const

const partNames = Object.keys(parts) as (keyof typeof parts)[]


function setPartImage(part: keyof typeof parts, poseNumber: number) {
  const { element, filename } = parts[part]

  element!.src = `/poses/pose_${poseNumber.toFixed(0)}/${filename}.webp`
  element!.dataset.pose = poseNumber.toFixed(0)
}

function cyclePartImage(part: keyof typeof parts) {
  const { element } = parts[part]

  const currentPoseNumber = parseInt(element!.dataset.pose as string)
  setPartImage(part, currentPoseNumber % 10 + 1)
}

function spinPartImage(part: keyof typeof parts, speed: number) {
  cyclePartImage(part)
  if (speed < 1) 
    return

  setTimeout(() => {
    spinPartImage(part, speed - 1)
  }, 150 + 200 / speed)
}

function main() {
   // reset pose to some random one
   const poseNumber = Math.floor(Math.random() * 10) + 1
   partNames.forEach((part) => {
     setPartImage(part, poseNumber)
   })

  document.addEventListener('click', () => {
    partNames.forEach((part) => {
      spinPartImage(part, 6 + Math.random() * 16)
    })
  })
}
main()