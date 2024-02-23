import { PartialType } from '@nestjs/swagger';
import { CreateWhatIsDoneDto } from './create-what-is-done.dto';

export class UpdateWhatIsDoneDto extends PartialType(CreateWhatIsDoneDto) {}
