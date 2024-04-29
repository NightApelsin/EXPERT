export class ParametersObject{
    constructor(parameters) {
        //main parameters
        this.creator = parameters.main.creator;
        this.product_name = parameters.main.product_name;
        this.open_direction = parameters.main.open_direction;
        this.open_side = parameters.main.open_side;
        this.door_width = parameters.main.door_width;
        this.doorBox_type = parameters.main.doorBox_type;
        this.denoising_parameter = parameters.main.denoising_parameter;
        this.individual_width = parameters.main.individual_width;
        this.individual_height = parameters.main.individual_height;
        this.door_mass = parameters.main.door_mass;

        //security parameters
        this.metal_list_count = parameters.door_security.metal_list_count;
        this.list_width = parameters.door_security.list_width;
        this.stiffeners_count = parameters.door_security.stiffeners_count;
        this.crossbars_count = parameters.door_security.crossbars_count;
        this.locks_count = parameters.door_security.locks_count;
        this.locks_mark = parameters.door_security.locks_mark;
        this.locks_class = parameters.door_security.locks_class
        this.armor_lining = parameters.door_security.armor_lining
        this.armor_package = parameters.door_security.armor_package
        this.night_crossbar = parameters.door_security.night_crossbar

        //decor parameters
        this.door_coating = parameters.decor.door_coating
        this.coating_color = parameters.decor.coating_color
        this.coating_inside = parameters.decor.coating_inside
        this.coating_outside = parameters.decor.coating_outside
        this.doorstep = parameters.decor.doorstep

        //furniture parameters
        this.furniture_color = parameters.furniture.furniture_color
        this.handle = parameters.furniture.handle
        this.closer = parameters.furniture.closer
        this.doorstep = parameters.furniture.doorstep
        this.hinges_decoration = parameters.furniture.hinges_decoration

        //isolations parameters
        this.filler = parameters.isolations.filler
        this.filler_width = parameters.isolations.filler_width
        this.filler_fire_class = parameters.isolations.filler_fire_class
        this.filler_using_temperature = parameters.isolations.filler_using_temperature
        this.filler_tumperature_save = parameters.isolations.filler_tumperature_save

        //tightness parameters
        this.tightness_count = parameters.tightness.tightness_count
        this.tightness_material = parameters.tightness.tightness_material

        //ease_of_use parameters
        this.hinges_type = parameters.ease_of_use.hinges_type
        this.hinges_count = parameters.ease_of_use.hinges_count
        this.opening_angle = parameters.ease_of_use.hingeopening_angles_type
        this.removable_angels = parameters.ease_of_use.removable_angels
        this.functional_lock = parameters.ease_of_use.functional_lock
        this.invisible_lock = parameters.ease_of_use.invisible_lock
        this.electric_lock = parameters.ease_of_use.electric_lock
        this.lock_regulation = parameters.ease_of_use.lock_regulation
        this.closer = parameters.ease_of_use.closer
        this.eye_height = parameters.ease_of_use.eye_height
        this.eye_vision_angle = parameters.ease_of_use.eye_vision_angle
        
        console.log(this)
    }
}