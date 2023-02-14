<?php

namespace App\Exports;

use Analytics;
use Carbon\Carbon;
use Spatie\Analytics\Period;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class DurationExport implements FromArray, WithMapping, ShouldAutoSize, WithHeadings, WithEvents, WithCustomStartCell, WithTitle, WithStyles
{
    private $period;

    public function __construct($period)
    {
        $this->period = $period;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        $durationData = Analytics::performQuery(Period::days($this->period), 'ga:sessions',[
            'metrics' => 'ga:sessions,ga:sessionDuration',
            'dimensions' => 'ga:date'
        ]);

        return $durationData['rows'];
    }

    public function map($duration): array
    {
         return [
            Carbon::createFromFormat('Ymd', $duration[0])->format("d F, Y"),
            $duration[1], 
            $duration[2] . " secs",
        ];
    }

    public function headings(): array
    {
        return [
        
            'Date',
            'Total Sessions',
            'Time Duration',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getStyle('B3:D3')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                ]);
            },
        ];
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function title(): string
    {
        return 'Duration Rate';
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Styling a specific cell by coordinate.
            'C' => ['alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]],
        ];
    }
}
