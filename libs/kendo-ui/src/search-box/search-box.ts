import { Component, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { AfterValueChangedDirective } from "@office/core";
import { PrimeNG } from "primeng/config";

@Component({
    selector: "search-box",
    templateUrl: "./search-box.html",
    imports: [KENDO_GRID, KENDO_INPUTS, AfterValueChangedDirective]
})
export class SearchBoxComponent implements OnInit {
    @Output() public valueChange: EventEmitter<string> = new EventEmitter();
        
    private primeng = inject(PrimeNG);
    
    searchLabel!: string;
    
    ngOnInit(): void {
        this.searchLabel = this.primeng.getTranslation('common.search');
    }
    
    public onQuickSearchClick(ev: MouseEvent): void {
        ev.stopImmediatePropagation();
    }

    public onQuickSearchKeydown(ev: KeyboardEvent, wrapper: HTMLDivElement): void {
        if (ev.key === "Escape") {
            wrapper.focus();
        }
        if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
            ev.stopImmediatePropagation();
        }
    }

    public onValueChange(value: any) {

        // Refresh the data
        this.valueChange.emit(value);
    }
}