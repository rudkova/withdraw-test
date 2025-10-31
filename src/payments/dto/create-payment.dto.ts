import { IsInt, IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @Max(10000)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
