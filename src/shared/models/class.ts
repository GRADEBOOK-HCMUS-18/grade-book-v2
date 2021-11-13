interface ClassInfoInterface{
  classID: string,
  className:string,
  teacherID:string,
  teacherName:string
  description:string,
  room:string
  createdAt:Date,
}

class Class implements ClassInfoInterface {
  classID= ""
  className=""
  teacherID=""
  teacherName=""
  description=""
  room=""
  createdAt= new Date()
  
}

export{Class}
