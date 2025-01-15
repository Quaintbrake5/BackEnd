import { Course } from "@prisma/client";
import { CreateCourseDTO } from "../../dtos/createCourse.dto";
import { CourseServices } from "../courses.services";
import { CustomError } from "../../utils/customError.utils";
import { db } from "../../config/db";

export class CourseServiceImpl implements CourseServices {
  async createCourse(data: CreateCourseDTO): Promise<Course> {
    const isCourseExist = await db.course.findFirst({
      where: {
        title: data.title,
      },
    });
  
    if (isCourseExist) {
      throw new CustomError(409, "A course with this title already exists.");
    }
  
    // Create the new course
    const course = await db.course.create({
      data: {
        title: data.title,
        description: data.description,
        duration: data.duration,
        price: data.price,
      },
    });
  
    return course;
  }

  async getCoursebyID(id: number): Promise<Course | null> {
    const course = await db.course.findUnique({
      where: { id },
    });
    if (!course) {
      throw new CustomError(404, "Course not found!!");
    }
    return course;
  }

  async getAllCourses(): Promise<Course[]> {
    return await db.course.findMany();
  }

  async updateCourse(
    id: number,
    data: Partial<CreateCourseDTO>
  ): Promise<Course> {
    const isCourseExist = await db.course.update({
      where: { id },
      data,
    });
    if (!isCourseExist) {
      throw new CustomError(404, "User not found in the database");
    }
    const course = await db.course.update({
      where: { id },
      data,
    });
    return course;
  }

  async deleteCourse(id: number): Promise<void> {
    await db.course.delete({
      where: { id },
    });
  }
}
