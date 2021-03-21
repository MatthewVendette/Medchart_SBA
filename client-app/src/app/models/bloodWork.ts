export interface BloodWork {
    id: string;
    userId: string;
    title: string;
    examDate: Date | null;
    resultsDate: Date | null;
    description: string;
    hemoglobin: number;
    hematocrit: number;
    whiteBloodCellCount: number;
    redBloodCellCount: number;
  }